export declare class EmailService {
    private transporter;
    constructor();
    sendOrderEmail(email: string, orderData: any): Promise<void>;
}
