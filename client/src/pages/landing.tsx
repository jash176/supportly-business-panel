import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, Star, MessageSquare, Shield, Zap, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import hersection from "../assets/hero_section.png";
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-purple-50">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-10 flex items-center justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                fill="white"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-purple-900">Supportly</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">
            Features
          </a>
          <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">
            Testimonials
          </a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-purple-700 hover:text-purple-800 hover:bg-purple-50">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Sign up free
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 px-6 md:px-10 flex flex-col items-center">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors">
            Customer support made simple
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Connect with your customers <span className="text-purple-600">instantly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Supportly helps you provide exceptional customer service with real-time chat, automated responses, and powerful analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                Get started for free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              Book a demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg aspect-video flex items-center justify-center">
                <img 
                  src={hersection} 
                  alt="Supportly Dashboard Preview" 
                  className="w-full h-full object-fill rounded-lg"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-20 px-6 md:px-10 bg-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              Customer Love
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by 5,000+ businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our customers are saying about their experience
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Testimonial 1 */}
            <motion.div variants={fadeIn}>
              <Card className="h-full bg-white border border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">
                    "Supportly has transformed how we handle customer support. The response times have improved by 60% and customer satisfaction is at an all-time high."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
                      SM
                    </div>
                    <div>
                      <h4 className="font-semibold">Sarah Mitchell</h4>
                      <p className="text-sm text-gray-500">CEO, TechStart Inc</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div variants={fadeIn}>
              <Card className="h-full bg-white border border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">
                    "The analytics dashboard alone is worth the price. We've been able to reduce our support costs while maintaining excellent customer relationships."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
                      JR
                    </div>
                    <div>
                      <h4 className="font-semibold">James Rodriguez</h4>
                      <p className="text-sm text-gray-500">COO, RetailPro</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div variants={fadeIn}>
              <Card className="h-full bg-white border border-purple-100 hover:border-purple-200 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">
                    "Implementation was seamless and the customer support team has been phenomenal. Our customers love the chat widget's clean design and quick responses."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
                      AK
                    </div>
                    <div>
                      <h4 className="font-semibold">Aisha Khan</h4>
                      <p className="text-sm text-gray-500">Founder, HealthPlus</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-20 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Badge className="mb-4 bg-purple-100 text-purple-800">
              Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your business needs.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Starter Plan */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-gray-200 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl">Starter</CardTitle>
                  <CardDescription>Perfect for small businesses</CardDescription>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold tracking-tight">Free$29</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "1 team member",
                      "Up to 500 conversations/month",
                      "Basic analytics",
                      "24-hour support",
                      "Widget customization"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Get started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Professional Plan */}
            <motion.div variants={fadeIn}>
              <Card className="h-full relative border-purple-200 shadow-lg">
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <Badge className="bg-purple-600 text-white hover:bg-purple-700">
                    Most Popular
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Mini</CardTitle>
                  <CardDescription>Ideal for growing teams</CardDescription>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold tracking-tight">$25</span>
                    <span className="ml-1 text-xl text-gray-500">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "5 team members",
                      "Unlimited conversations",
                      "Advanced analytics",
                      "Priority support",
                      "Full widget customization",
                      "AI-powered responses",
                      "Team collaboration tools"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Get started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div variants={fadeIn}>
              <Card className="h-full border-gray-200 hover:border-purple-200 transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl">Professional</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold tracking-tight">$79</span>
                    <span className="ml-1 text-xl text-gray-500">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Unlimited team members",
                      "Unlimited conversations",
                      "Custom analytics & reporting",
                      "24/7 dedicated support",
                      "Custom widget development",
                      "Advanced AI capabilities",
                      "API access",
                      "SSO & advanced security",
                      "Dedicated account manager"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Contact sales
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <p className="text-gray-600 mb-6">Need a custom plan? We've got you covered.</p>
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              Contact us for custom pricing
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-6 md:px-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your customer support?</h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Join thousands of businesses that use Supportly to provide exceptional customer service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-50 px-8">
                  Get started for free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-purple-200 text-white hover:bg-purple-500">
                Schedule a demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-10 bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-md bg-purple-600 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white">Supportly</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Supportly helps businesses provide exceptional customer service with real-time chat, automated responses, and powerful analytics.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Changelog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Licenses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Settings</a></li>
              </ul>
            </div>
          </div>

          <Separator className="bg-gray-800 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Supportly. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;