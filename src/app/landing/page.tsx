"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  CreditCard,
  Shield,
  Smartphone,
  Users,
  Calendar,
  ArrowRight,
  Menu,
  X,
  Star,
  CheckCircle,
  DollarSign,
  Clock,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const NacosPayLanding: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features: Feature[] = [
    {
      icon: <Wallet className="w-8 h-8 text-blue-600" />,
      title: "Digital Wallet",
      description:
        "Secure digital wallet to store funds for all your NACOS payments and transactions.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: "Easy Payments",
      description:
        "Pay departmental fees, event tickets, and association dues with just a few taps.",
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure Transactions",
      description:
        "Bank-level security ensures your money and personal information stay protected.",
    },
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Event Management",
      description:
        "Register and pay for NACOS events, workshops, and seminars seamlessly.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Student Community",
      description:
        "Connect with fellow computing students and stay updated on NACOS activities.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-600" />,
      title: "Mobile First",
      description:
        "Optimized mobile experience for payments on-the-go, anytime, anywhere.",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Adebayo Okunola",
      role: "Computer Science, 300L",
      content:
        "Nacos Pay has made paying for departmental events so much easier. No more long queues!",
      rating: 5,
    },
    {
      name: "Fatima Ibrahim",
      role: "Software Engineering, 200L",
      content:
        "I love how secure and fast the transactions are. Perfect for busy students like me.",
      rating: 5,
    },
    {
      name: "Chidi Okwu",
      role: "Information Technology, 400L",
      content:
        "Finally, a payment solution designed specifically for NACOS students. Highly recommended!",
      rating: 5,
    },
  ];

  const router = useRouter();

  const stats = [
    { number: "500+", label: "Active Students" },
    { number: "₦2M+", label: "Transactions Processed" },
    { number: "50+", label: "Events Funded" },
    { number: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Nacos Pay</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                How it Works
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Reviews
              </a>
              <Button
                onClick={() => router.push("/auth/login")}
                variant="outline"
                className="mr-2"
              >
                Login
              </Button>
              <Button onClick={() => router.push("/auth/signup")}>
                Sign Up
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-600">
                Features
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-600">
                How it Works
              </a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-600">
                Reviews
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button
                  onClick={() => router.push("/auth/login")}
                  variant="outline"
                  className="w-full"
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/auth/signup")}
                  className="w-full"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
                For NACOS Crawford University Students
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Digital Wallet for
                <span className="text-blue-600 block">NACOS Payments</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Seamlessly pay for departmental fees, events, and association
                dues. Built specifically for Nigeria Association of Computing
                Students at Crawford University.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => router.push("/auth/signup")}
                  size="lg"
                  className="text-lg px-8 py-3"
                >
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                {/* <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3"
                >
                  Learn More
                </Button> */}
              </div>
              <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative mx-auto w-64 h-96 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-300">
                <div className="absolute inset-4 bg-white rounded-2xl flex flex-col p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm font-semibold text-gray-900">
                      Nacos Pay
                    </div>
                    <Wallet className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="mb-8">
                    <div className="text-sm text-gray-600 mb-1">
                      Wallet Balance
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      ₦15,450.00
                    </div>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">
                        NACOS Week Payment
                      </div>
                      <div className="text-xs text-gray-600">₦2,500.00</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">
                        Departmental Fee
                      </div>
                      <div className="text-xs text-gray-600">₦5,000.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for NACOS Payments
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed specifically for computing students with features that
              make managing your NACOS finances simple and secure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md"
              >
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of NACOS students already using Nacos Pay
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up & Verify",
                description:
                  "Create your account using your Crawford University student email and verify your NACOS membership.",
                icon: <Users className="w-12 h-12 text-blue-600" />,
              },
              {
                step: "02",
                title: "Fund Your Wallet",
                description:
                  "Add money to your Nacos Pay wallet using bank transfer, debit card, or mobile money.",
                icon: <DollarSign className="w-12 h-12 text-blue-600" />,
              },
              {
                step: "03",
                title: "Make Payments",
                description:
                  "Pay for departmental fees, events, and association dues instantly from your digital wallet.",
                icon: <CheckCircle className="w-12 h-12 text-blue-600" />,
              },
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-blue-200 transition-colors">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Students Are Saying
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by computing students across Crawford University
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Simplify Your NACOS Payments?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the growing community of computing students who trust Nacos Pay
            for all their departmental transactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push("/auth/signup")}
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-3"
            >
              Sign Up Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            {/* <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600"
            >
              Contact Support
            </Button> */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Nacos Pay</span>
              </div>
              <p className="text-gray-400">
                Digital wallet solution for Nigeria Association of Computing
                Students at Crawford University.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Nacos Pay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NacosPayLanding;
