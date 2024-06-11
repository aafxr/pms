import clsx from "clsx";
import {PropsWithChildren} from "react";

import {Header} from "./Header";
import {Footer} from "./Footer";
import {Content} from "./Content";
import './Wrapper.css'


interface WrapperType extends PropsWithChildren {
    direction?: 'column' | 'row'
    className?: string
}

function _Wrapper({
                      direction = 'column',
                      className,
                      children
                  }: WrapperType) {
    return <div className={clsx('wrapper', direction, className)}>{children}</div>;
}


export const Wrapper = Object.assign(_Wrapper, {Header, Footer, Content});