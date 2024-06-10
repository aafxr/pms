import React, {HTMLAttributes} from 'react';

export function PrintIcon(props: HTMLAttributes<SVGSVGElement>) {
    return (
        <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19 10V5C19 4.73478 18.8946 4.48043 18.7071 4.29289C18.5196 4.10536 18.2652 4 18 4H6C5.73478 4 5.48043 4.10536 5.29289 4.29289C5.10536 4.48043 5 4.73478 5 5V10M20 10H4C3.73478 10 3.48043 10.1054 3.29289 10.2929C3.10536 10.4804 3 10.7348 3 11V19C3 19.2652 3.10536 19.5196 3.29289 19.7071C3.48043 19.8946 3.73478 20 4 20H20C20.2652 20 20.5196 19.8946 20.7071 19.7071C20.8946 19.5196 21 19.2652 21 19V11C21 10.7348 20.8946 10.4804 20.7071 10.2929C20.5196 10.1054 20.2652 10 20 10Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M17.5 20V17C17.5 16.7348 17.3946 16.4804 17.2071 16.2929C17.0196 16.1054 16.7652 16 16.5 16H11C10.7348 16 10.4804 16.1054 10.2929 16.2929C10.1054 16.4804 10 16.7348 10 17V20M6 13H8"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
}
