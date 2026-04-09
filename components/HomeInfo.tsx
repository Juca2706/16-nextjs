"use client";
import Link from "next/link";
import { SignInIcon, UserCirclePlusIcon } from "@phosphor-icons/react";

export default function HomeInfo() {
    return (
        <div className="w-full h-screen overflow-hidden">
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(/imgs/fondo-home.png)",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <div className="hero-overlay bg-black/40"></div>

                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md mx-auto flex flex-col items-center p-8 bg-black/40 backdrop-blur-md rounded">
                        <div className="flex flex-col items-center mb-4">

                            <img
                                src="/imgs/logo.png"
                                alt="Logo"
                                className="w-80 h-auto block"
                                style={{ marginBottom: "-30px" }}
                            />

                            <h1 className="text-5xl font-black text-white drop-shadow-lg">
                                Hello Next JS
                            </h1>

                        </div>

                        <p className="mb-6 text-sm text-left leading-relaxed opacity-90">
                            Welcome to <strong>Games Next JS</strong>, your ideal space to explore the world of video games,
                            where technology and fun come together to offer you the best in consoles,
                            games, and gaming experiences. Here you can discover new releases,
                            relive classics, and stay up-to-date with everything that moves the gaming universe. 🚀🎮
                        </p>

                        <div className="flex gap-4">
                            <Link href="handler/sign-in" className="btn btn-outline border-2 hover:bg-white hover:text-black">
                                <SignInIcon size={20} />
                                Sign In
                            </Link>

                            <Link href="handler/sign-up" className="btn btn-outline border-2 hover:bg-white hover:text-black">
                                <UserCirclePlusIcon size={20} />
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
