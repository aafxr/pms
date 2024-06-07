import React from "react";

export function ChevronIcon(props: React.HTMLAttributes<SVGSVGElement>){

    return (
        <svg {...props} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2.40592 7.427C1.99746 7.01854 1.99746 6.3563 2.40592 5.94784C2.81439 5.53937 3.47663 5.53937 3.88509 5.94784L9.99967 12.0624L16.1143 5.94783C16.5227 5.53937 17.185 5.53937 17.5934 5.94784C18.0019 6.3563 18.0019 7.01854 17.5934 7.427L10.6533 14.3672C10.2923 14.7281 9.70705 14.7281 9.34608 14.3672L2.40592 7.427Z"
                fill="currentColor"/>
        </svg>

    )
}