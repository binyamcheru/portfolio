"use client";

import React, { useState } from "react";
import { Send, Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setResult("");

        const formData = new FormData(event.currentTarget);
        formData.append("access_key", "82c39fb8-45af-48cf-95d2-0fc0fde2fad4");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Message sent successfully!");
                event.currentTarget.reset();
            } else {
                setResult("Something went wrong. Please try again.");
            }
        } catch (error) {
            setResult("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <section id="contact" className="py-20 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-primary font-mono text-sm tracking-tighter uppercase">Connect</h2>
                        <h3 className="text-4xl font-bold text-white">Let's build something great together.</h3>
                    </div>
                    <p className="text-white/60 leading-relaxed max-w-md">
                        I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open!
                    </p>

                    <div className="space-y-4 pt-6">
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-primary">
                                <Mail size={18} />
                            </div>
                            <span className="font-medium">binyamcheru123@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-primary">
                                <MapPin size={18} />
                            </div>
                            <span className="font-medium">Addis Ababa, Ethiopia</span>
                        </div>
                    </div>
                </div>

                <div className="glass p-8 rounded-3xl border border-white/10">
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="john@example.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                placeholder="Project Collaboration"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Summary</label>
                            <textarea
                                rows={4}
                                name="message"
                                required
                                placeholder="Tell me about your project..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 mt-2 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"} {!isSubmitting && <Send size={18} />}
                        </button>
                        {result && (
                            <p className={`text-center text-sm font-medium ${result.includes("success") ? "text-green-400" : "text-red-400"}`}>
                                {result}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
