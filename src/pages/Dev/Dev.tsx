import {Select, SelectOptionType} from "../../components/Select/Select";
import {Container} from "../../components";

export function Dev() {
    const sortVar: SelectOptionType[] = [
        {id: 1, value: 'по дате создания'}
    ]

    return (
        <div className='dev'>
            <Container>
                <Select items={sortVar} title={'sort'} />

            </Container>
        </div>
    )
}

