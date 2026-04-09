"use client";
import Link from "next/link";
import { ArrowCircleLeftIcon } from "@phosphor-icons/react";

export default function BackHomeButton() {
    return (
        <div>
            <Link className="btn btn-outline w-full hover:bg-white hover:text-black" href="/">
                <ArrowCircleLeftIcon size={20} />
                Go Back Home
            </Link>
        </div>
    )
}