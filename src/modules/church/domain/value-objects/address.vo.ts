export class Address {
  constructor(
    public street: string,
    public number: string,
    public district: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public complement?: string,
  ) {}
}
