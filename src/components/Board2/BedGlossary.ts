/**
 * спальное мстов спальной комнате
 *
 * справочная информация
 */
export class BedGlossary {
    id: number
    /** название удобства */
    name: string
    /** количесво спальных мест */
    places: number

    constructor(bed: Partial<BedGlossary> = {}) {
        this.id = bed.id !== undefined ? bed.id : 0
        this.name = bed.name !== undefined ? bed.name : ''
        this.places = bed.places !== undefined ? bed.places : 0
    }
}