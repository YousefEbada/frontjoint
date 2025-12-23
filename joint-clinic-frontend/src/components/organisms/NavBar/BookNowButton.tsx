"use client";

import { color } from "@/lib/constants/colors";
import { useRouter } from "next/navigation";
import { scrollToHash } from "@/lib/utils/smoothScroll";

type Props = {
    onAfterNavigate?: () => void;
};

const BookNowButton = ({ onAfterNavigate }: Props) => {
    const router = useRouter();

    const onClick = async () => {
        // If the target exists on the current page, perform a smooth scroll
        const el = typeof document !== "undefined" ? document.querySelector("#book") : null;

        if (el) {
            // update URL and perform custom smooth scrolling
            await scrollToHash("#book", 800, 86);
            onAfterNavigate?.();
            return;
        }

        // fallback: push to the URL (this will trigger our global scroll handler)
        router.push("/#book");
        onAfterNavigate?.();
    };

    return (
        <button
            className={"px-8 py-2 text-xl text-white rounded-[48px]"}
            onClick={onClick}
            style={{
                backgroundColor: color.warning,
                cursor: "pointer",
            }}
        >
            Book Now
        </button>
    );
};

export default BookNowButton;