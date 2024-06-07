import {Container, Header, Wrapper} from "../../components";

import './Main.css'

export function Main() {
    return (
        <Wrapper>
            <Wrapper.Header>
                <Header/>
            </Wrapper.Header>
            <Wrapper.Content>
                content
            </Wrapper.Content>
            <Wrapper.Footer>
                footer
            </Wrapper.Footer>
        </Wrapper>
    )
}