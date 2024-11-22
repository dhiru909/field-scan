'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Construction,
  MapPin,
  Bell,
  Clock,
  Search,
  ArrowRight,
  Smartphone,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function ConstructionInfoLandingComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Stay Informed About Construction in Your Area
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Get real-time updates on construction projects around you.
                  Plan your routes, avoid delays, and stay ahead of the changes
                  in your neighborhood.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white"
                    placeholder="Enter your address"
                    type="text"
                  />
                  <Button type="submit" variant="secondary">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <MapPin className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Locate Projects</h3>
                <p className="text-muted-foreground">
                  Find all ongoing and upcoming construction projects in your
                  area with our interactive map.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Bell className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Get Notifications</h3>
                <p className="text-muted-foreground">
                  Receive timely alerts about new projects, updates, and
                  completion dates that may affect your daily routine.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Clock className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Real-Time Updates</h3>
                <p className="text-muted-foreground">
                  Access the latest information on project progress, road
                  closures, and estimated completion times.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Get ConstructionInfo on Your Phone
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Download our mobile app to get instant notifications and view
                  construction updates on the go. Available for iOS and Android.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2"
                  >
                    <Image
                      src="/placeholder.svg?height=40&width=135"
                      width={135}
                      height={40}
                      alt="Download on the App Store"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-2"
                  >
                    <Image
                      src="/placeholder.svg?height=40&width=135"
                      width={135}
                      height={40}
                      alt="Get it on Google Play"
                    />
                  </Link>
                </div>
              </div>
              <div className="lg:order-last">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  width={300}
                  height={300}
                  alt="ConstructionInfo mobile app"
                  className="mx-auto rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "ConstructionInfo has saved me countless hours of frustration. I always know what's happening in my neighborhood now!",
                  author: 'Sarah J., Homeowner',
                },
                {
                  quote:
                    'As a delivery driver, this app is a game-changer. I can plan my routes efficiently and avoid unexpected delays.',
                  author: 'Mike T., Delivery Driver',
                },
                {
                  quote:
                    'The real-time updates have been invaluable for our city planning efforts. Highly recommended for municipal workers.',
                  author: 'Emily R., City Planner',
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center space-y-2 p-6 bg-muted rounded-lg"
                >
                  <p className="text-muted-foreground italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-semibold">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full max-w-3xl mx-auto"
            >
              {[
                {
                  question: 'How accurate is the construction information?',
                  answer:
                    'We source our data directly from local government agencies and construction companies, ensuring high accuracy. However, last-minute changes can occur, so we recommend checking for updates regularly.',
                },
                {
                  question: 'Is the service available in my area?',
                  answer:
                    "ConstructionInfo is currently available in most major cities across the United States. We're continuously expanding our coverage. Enter your address on our homepage to check availability in your area.",
                },
                {
                  question: 'How much does it cost to use ConstructionInfo?',
                  answer:
                    'We offer a free basic tier that provides general information about major construction projects. For more detailed updates and personalized notifications, we have affordable premium plans starting at $4.99/month.',
                },
                {
                  question:
                    "Can I report construction projects that aren't listed?",
                  answer:
                    'We encourage user contributions. You can report new projects or updates to existing ones through our mobile app or website. Our team verifies all submissions before adding them to our database.',
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Stay Ahead of the Construction
                </h2>
                <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't let construction projects catch you off guard. Sign up
                  now and get instant access to real-time construction
                  information in your area.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Input
                    className="max-w-lg flex-1 bg-white"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" variant="secondary">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-200">
                  By signing up, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 ConstructionInfo. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
