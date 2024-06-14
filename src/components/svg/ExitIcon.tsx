import React, {HTMLProps} from 'react';

export function ExitIcon(props: HTMLProps<SVGSVGElement>) {
    return (
        <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.25 10C6.25 9.83424 6.31585 9.67527 6.43306 9.55806C6.55027 9.44085 6.70924 9.375 6.875 9.375H12.5V5.3125C12.5 4.0625 11.1801 3.125 10 3.125H4.0625C3.48253 3.12562 2.92649 3.35629 2.51639 3.76639C2.10629 4.17649 1.87562 4.73253 1.875 5.3125V14.6875C1.87562 15.2675 2.10629 15.8235 2.51639 16.2336C2.92649 16.6437 3.48253 16.8744 4.0625 16.875H10.3125C10.8925 16.8744 11.4485 16.6437 11.8586 16.2336C12.2687 15.8235 12.4994 15.2675 12.5 14.6875V10.625H6.875C6.70924 10.625 6.55027 10.5592 6.43306 10.4419C6.31585 10.3247 6.25 10.1658 6.25 10ZM17.9418 9.5582L14.8168 6.4332C14.6986 6.32094 14.5413 6.25928 14.3783 6.26137C14.2153 6.26345 14.0596 6.32912 13.9444 6.44437C13.8291 6.55962 13.7635 6.71534 13.7614 6.87831C13.7593 7.04129 13.8209 7.19863 13.9332 7.3168L15.991 9.375H12.5V10.625H15.991L13.9332 12.6832C13.8727 12.7407 13.8244 12.8096 13.791 12.8861C13.7576 12.9625 13.7398 13.0449 13.7387 13.1283C13.7377 13.2117 13.7533 13.2945 13.7847 13.3718C13.8162 13.4491 13.8628 13.5193 13.9217 13.5783C13.9807 13.6372 14.0509 13.6838 14.1282 13.7153C14.2055 13.7467 14.2883 13.7623 14.3717 13.7613C14.4551 13.7602 14.5375 13.7424 14.6139 13.709C14.6904 13.6756 14.7593 13.6273 14.8168 13.5668L17.9418 10.4418C18.0589 10.3246 18.1247 10.1657 18.1247 10C18.1247 9.83431 18.0589 9.6754 17.9418 9.5582Z"
                fill="currentColor"/>
        </svg>

    );
}

