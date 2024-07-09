import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe"; // Ensure stripe is correctly initialized
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Ensure that the stripe instance is correctly initialized with the API key
if (!process.env.STRIPE_API_KEY) {
    throw new Error("STRIPE_API_KEY environment variable is not set");
}

const stripeClient = new Stripe(process.env.STRIPE_API_KEY, {
    apiVersion: "2022-11-15", // Use the appropriate API version
});

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const user = await currentUser();

        if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                isPublished: true
            }
        });

        if (!course) {
            return new NextResponse("Course not found", { status: 404 });
        }

        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId: user.id,
                    courseId: params.courseId
                }
            }
        });

        if (purchase) {
            return new NextResponse("Already purchased", { status: 400 });
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: course.title,
                        description: course.description!,
                    },
                    unit_amount: Math.round((course.price! * 100) + course.price! * 0.18),
                }
            }
        ];

        let stripeCustomer = await db.stripeCustomer.findUnique({
            where: {
                userId: user.id
            },
            select: {
                stripeCustomerId: true
            }
        });

        if (!stripeCustomer) {
            const customer = await stripeClient.customers.create({
                email: user.emailAddresses[0].emailAddress
            });

            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: customer.id
                }
            });
        }

        const session = await stripeClient.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            mode: "payment",
            line_items,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
            metadata: {
                courseId: course.id,
                userId: user.id
            }
        });
        console.log(session.url)
        return NextResponse.json({ url: session.url });

    } catch (error) {
        console.log("[CHECKOUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
