export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    last_login: Date;
    date_joined: Date;
    // Agrega otros campos según sea necesario
}
