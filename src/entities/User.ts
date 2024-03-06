export default class User {
    public readonly id: string
    public name: string
    public email: string
    public password?: string
    public picture: Object

    constructor(props: Omit<User, 'id' | 'picture' | 'name'>, id?: string, name?: string ){
        Object.assign(this, props)
    }
}