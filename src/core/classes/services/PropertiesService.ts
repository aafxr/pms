import {fetchRooms, FetchRoomsRequestParams} from "../../../api/fetchRooms";
import {RoomBlockPeriod} from "../v1/RoomBlockPeriod";
import {BookingItem} from "../v1/BookingItem";
import {Property} from "../v1/Property";
import {RoomType} from "../v1/RoomType";
import {Person} from "../v1/Person";
import {Board} from "../v1/Board";
import {Room} from "../v1/Room";

export class PropertiesService {
    static async getProperties(options: FetchRoomsRequestParams) {
        const data = await fetchRooms(options).catch()
        if (!data) return

        let {
            properties,
            rooms,
            room_types,
            booking_items,
            individual_persons,
            room_block_periods
        } = data

        const b = new Board()

        properties.forEach(p => new Property(p, b))
        rooms.rooms.forEach(r => new Room(r, b))
        room_types.forEach(rt => new RoomType(b, rt))
        booking_items.forEach(bi => new BookingItem(bi, b))
        individual_persons.forEach(p => new Person(p, b))
        room_block_periods.forEach(rb => new RoomBlockPeriod(b, rb))

        b.pagination = rooms.pagination

        return b
    }
}