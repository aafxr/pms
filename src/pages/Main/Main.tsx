import {Blank, Container, Header, Search, Select, Wrapper} from "../../components";

import './Main.css'

export function Main() {
    return (
        <Wrapper>
            <Wrapper.Header>
                <Header/>
            </Wrapper.Header>
            <Wrapper.Content>
                <Container>
                    <Blank>
                        <Select>
                            <Select.Title>Статус</Select.Title>
                            <Select.Items>
                                <Select.Item>Статус 1</Select.Item>
                                <Select.Item>Статус 2</Select.Item>
                                <Select.Item>Статус 3</Select.Item>
                                <Select.Item>Статус 4</Select.Item>
                            </Select.Items>
                        </Select>
                        <Search placeholder='Гость, номер или id бронирования' />
                    </Blank>
                </Container>
            </Wrapper.Content>
            <Wrapper.Footer>
                footer
            </Wrapper.Footer>
        </Wrapper>
    )
}
