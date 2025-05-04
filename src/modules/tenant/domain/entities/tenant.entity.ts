export class Tenant {
  readonly _id?: string;
  corporateName: string;
  document: string;
  logoUrl?: string;
  mainContact: string;
  status: 'active' | 'inactive';
  subscriptionPlan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;

  constructor(props: Omit<Tenant, '_id'>, _id?: string) {
    Object.assign(this, props);
    if (_id) this._id = _id;
  }
}
