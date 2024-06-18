import React from 'react';

export function Board(props) {
    return (
        <div></div>
    );
}

// import React, {useMemo} from 'react';
//
// import {Container, Wrapper} from "../../components";
//
// import './Board.scss'
// import {data} from "./data";
//
// class RoomBed{
//     id
//     name
//     /** people count */
//     places
//     constructor(roomBed = {}){
//
//     }
// }
//
// class BedType{
//     id
//     room_type_id
//     room_bed_id
//     count
//     is_main
//     room_bed
//     constructor(bt = {}) {
//         if(bt.id !== undefined) this.id = 0
//         if(bt.room_type_id !== undefined) this.room_type_id = 0
//         if(bt.room_bed_id !== undefined) this.room_bed_id = 0
//         if(bt.count !== undefined) this.count = 0
//         if(bt.is_main !== undefined) this.is_main = false
//         if(bt.room_bed !== undefined) this.room_bed = new RoomBed(rt.room_bed)
//     }
// }
//
// class RoomCategory{
//     id
//     property_id
//     name
//     desc
//     area
//     room_type_beds
//     constructor(rc = {}) {
//         if(rc.id !== undefined) this.id = rc.id
//         if(rc.property_id !== undefined) this.property_id = rc.property_id
//         if(rc.name !== undefined) this.name = rc.name
//         if(rc.desc !== undefined) this.desc = rc.desc
//         if(rc.area !== undefined) this.area = rc.area
//         if(rc.room_type_beds !== undefined) this.room_type_beds = new BedType(rc.room_type_beds )
//     }
// }
//
// export function Board() {
//     const categories = useMemo(() => {
//         const cm = new Map()
//         data.room_types.forEach(rt => {
//             if(!cm.has(rt)) cm.set(rt, [])
//             data.rooms.rooms.forEach(r => rt.id === r.room_type_id ? cm.get(rt).push(r): null)
//         })
//         return cm
//     }, [data])
//
//     console.log(categories)
//
//
//     return (
//         <Wrapper>
//             <Wrapper.Content>
//                 <Container>
//                     <div className='board'></div>
//                 </Container>
//             </Wrapper.Content>
//         </Wrapper>
//     );
// }
//
