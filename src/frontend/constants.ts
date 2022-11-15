export type RouteName = 'home' | 'dashboard' | 'products' | 'services' | 'login' | 'aboutUs' | 'feedback';

export enum UserType {
  CUSTOMER = 'customer',
  AGENT = 'agent',
  ADMIN = 'admin'
}

export interface User {
  username: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
}

export interface Customer extends User {
  customerId: number;
  type: UserType.CUSTOMER;
}

export interface Agent extends User {
  agentId: number;
  areaCode: number;
  type: UserType.AGENT;
}

export interface LoginResponseBody {
  success: boolean;
  user: User | null;
  error: string | null;
}

export type RegisterResponseBody = LoginResponseBody;

export interface UserDeleteResponseBody {
  success: boolean;
}

export type UserUpdateResponseBody = UserDeleteResponseBody;

export type AddPolicyResponseBody = UserDeleteResponseBody;

export const productNames = ['home', 'health', 'life', 'travel', 'twoWheeler', 'fourWheeler'] as const;
export type ProductName = typeof productNames[number];

export type ServiceName = 'agentLocator' | 'storeLocator' | 'premiumCalculator';

export type CustomerDashboardTileName = 'viewPolicies' | 'manageAccount' | 'managePayments';
export type AgentDashboardTileName = 'manageAccount' | 'manageCustomers';
export type AdminDashboardTileName = 'manageAccount' | 'manageAgents' | 'managePolicies';

export interface Policy {
  id: number;
  username: string;
  productName: ProductName;
}

export interface UserManagementEditorEditParams {
  username: string;
  name: string;
  email: string;
  phone: string;
}

export type CustomerManagementEditorEditParams = UserManagementEditorEditParams;

export interface AgentManagementEditorEditParams extends UserManagementEditorEditParams {
  areaCode: number;
}

export interface UserManagementEditorSubmitParams {
  name: string;
  email: string;
  phone: string;
}

export type CustomerManagementEditorSubmitParams = UserManagementEditorSubmitParams;

export interface AgentManagementEditorSubmitParams extends UserManagementEditorSubmitParams {
  areaCode: number;
}

export const alertIconColors = {
  success: '#61cf82',
  error: '#cf6161'
}

export const tileIcons = {
  login: {
    customer: "account",
    agent: "account-tie",
    admin: "account-eye"
  }
}

export const tileColors = {
  login: {
    customer: "#d4ddd4",
    agent: "#dddbd4",
    admin: "#ddd4d4"
  }
}

export const productCosts: {[key in ProductName]: number} = {
  home: 1000,
  health: 1500,
  life: 1500,
  travel: 2000,
  twoWheeler: 1000,
  fourWheeler: 2000
}

export const productTitles: {[key in ProductName]: string} = {
  home: 'Home Insurance',
  health: 'Health Insurance',
  travel: 'Travel Insurance',
  life: 'Life Insurance',
  twoWheeler: '2 Wheeler Insurance',
  fourWheeler: '4+ Wheeler Insurance'
}

export const productDetails = {
  home: {
    title: productTitles['home'],
    text: `This policy covers interior damage, exterior damage, loss or damage of personal assets, and injury that arises while on the property.

This covers losses caused by:
1. Fire
2. Aircraft damage
3. Lightning and rain
4. Riots
5. Storms, cyclones, floods, hurricanes
6. Missile testing
7. Earthquake

Validity: 5 years
Monthly premium to be paid: Rs. ${productCosts['home']}`,
  },
  health: {
    title: productTitles['health'],
    text: `A health insurance policy extends coverage against medical expenses incurred owing to accidents, illness or injury.

This covers losses caused by:
1. Hospitalisation Expenses
2. Pre and Post Hospitalisation Charges
3. No Cap on ICU Room Charges
4. Cover Against Mental Illness
5. Bariatric Surgery Costs
6. No Room Rent Capping
7. Road Ambulance Charges
8. Organ Donation Charges
9. Domiciliary Care

Validity: 10 years
Monthly premium to be paid: Rs. ${productCosts['health']}`,
  },
  life: {
    title: productTitles['life'],
    text: `Life insurance is a contract between an insurer and a policy owner. A life insurance policy guarantees the insurer pays a sum of money to named beneficiaries when the insured dies in exchange for the premiums paid by the policyholder during their lifetime.

The life insurance application must accurately disclose the insured’s past and current health conditions and high-risk activities to enforce the contract.

Validity: 5 years
Monthly premium to be paid: Rs. ${productCosts['life']}`
  },
  travel: {
    title: productTitles['travel'],
    text: `Planning travel, whether it be for business or pleasure, takes time and energy, not to mention money. The last thing anyone wants is to miss out on a well-deserved vacation because of circumstances outside of their control, such as weather, illness, or baggage loss.
Travel insurance covers a pre-planned trip and will reimburse the policyholder if certain unforeseen circumstances occur. You can think of travel insurance as a way to protect your investment in a trip before and during travel.

This covers losses caused by:
1. Trip Cancellation / Interruption
2. Travel Medical
3. Medical Evacuation
4. Baggage Delay / Loss
5. Accidental Death & Dismemberment

Validity: 6 months
Premium to be paid: Rs. ${productCosts['travel']}`
  },
  twoWheeler: {
    title: productTitles['twoWheeler'],
    text: `Bike insurance, technically called a two-wheeler insurance, is an ideal tool to safeguard yourself against the financial losses which may arise due to an unfortunate event like a road accident involving the two-wheeler. According to the Indian Motor Tariff, 2002 it is mandatory for every bike owner to have at least a third party bike insurance cover.

This covers losses caused by:
1. Road Accident
2. Natural Calamities - Floods, Earthquakes, Cyclones, etc.
3. Fire/Explosion
4. Riots, Strikes
5. Terrorist Activities
6. Damage During Travel By Air, Rail, Road, Water.

Validity: 2 years
Monthly premium to be paid: ${productCosts['twoWheeler']}`
  },
  fourWheeler: {
    title: productTitles['fourWheeler'],
    text: `Car insurance policy is bought to protect your car or vehicle, from unexpected or accidental risks. It mainly gives you protection against the losses that you incur in case of unavoidable instances. It helps you get cover against financial losses caused by accidents, liabilities & in some cases, even losses caused by theft. The premium of car insurance depends on certain factors like; the value of your car, type of coverage, voluntary excess & vehicle classification. Car insurance coverage gives you the confidence to drive without worries. In case of emergencies, it acts as a life-saving toolkit for the insurance holder.
In order to get these benefits continuously, car insurance policy renewal should be done in a timely manner.

This covers losses caused by:
1. Road Accident
2. Fire/Explosion damage
3. Riots, Strikes
4. Natural Calamities - Floods, Earthquakes, Cyclones, etc.
5. Terrorist Activities
6. Damage During Travel By Air, Rail, Road, Water.

Validity: 2 years
Monthly premium to be paid: Rs ${productCosts['fourWheeler']}`
  }
}

export const storeList = [
  {
    id: 1,
    address: "23 A/44X, Diamond Harbour Rd, Sahapur, Taratala, Kolkata, West Bengal 700053",
  },
  {
    id: 2,
    address: "Thakurpukur Depot Rd, Silpara, Purba Barisha, Kolkata, West Bengal 700008",
  },
  {
    id: 3,
    address: "4, Radha Gobindo Nath Sarani, Rajendra Prasad Colony, Tollygunge, Kolkata, West Bengal 700033",
  },
  {
    id: 4,
    address: "218, Prince Golam Mohammed Rd, Manoharpukur, Kalighat, Kolkata, West Bengal 700029",
  },
  {
    id: 5,
    address: "4, Kasba Industrial Estate, Sector J, East Kolkata Twp, Kolkata, West Bengal 700107",
  },
  {
    id: 6,
    address: "LB Block, Sector III, Bidhannagar, Kolkata, West Bengal 700098",
  },
  {
    id: 7,
    address: "EN Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091",
  },
  {
    id: 8,
    address: "SH 1, Narendrapur, Kolkata, West Bengal 700103",
  },
  {
    id: 9,
    address: "J735+6V3, Kamrangu, Andul, Howrah, West Bengal 711409",
  },
  {
    id: 10,
    address: "A1B, Tiljala Rd, Beniapukur, Kolkata, West Bengal 700046"
  }
];

