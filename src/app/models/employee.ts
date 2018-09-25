export interface IEmployee {
    id: number;
    name: string;
    dateOfBirth?: Date;
    country: string;
    userName: string[];
    hireDate?: Date;
    status: boolean;
    area: 'services' | 'kitchen' | null;
    jobTitle: string;
    tipRate: number;
}
