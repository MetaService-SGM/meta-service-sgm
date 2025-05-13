import { v4 as uuidv4 } from "uuid"
import { ServiceOrder } from "./ServiceOrderTable"
import { Companies } from "./TableCompanies"
import { Alert } from "./AlertTable"
import { Product } from "./StockTable"

export const mockAlerts: Alert[] = [
    {
        alertId: uuidv4(),
        alertTitle: "Doc à exp",
        alertType: "Documentação",
        alertData: "2025-05-08",
        alertDescription: "NR35",
        idCollaborator: uuidv4(), }
]

export const mockproducts: Product[] = [
    {
        productId: uuidv4(),
        productName: "Camis Mang Curt",
        productSize: "P",
        productData: "12/04/22",
        productQuantity: 4,
        productCA: uuidv4(),
        productColor: "Azul",
        productCI: uuidv4(),

    }
]

export const mockServiceOrder: ServiceOrder[] = [
    {
        NOS: uuidv4(),
        OpeningDate: "22/05/2025",
        Request: "Ana Maria Braga",
        Responsible: "Louro José",
        Status: "Em análise",
        Priority: "Baixa"
    }
]

export const mockCompanies: Companies[] = [
    {
        companyId: uuidv4(),
        companyCNPJ: "12.345.678/0001-90",
        companyName: "MetaService Soluções Industriais",
        companySegment: "Manutenção Industrial",
        companyCity: "São Paulo",
        companyCEP: "01001-000",
    },
    {
        companyId: uuidv4(),
        companyCNPJ: "98.765.432/0001-12",
        companyName: "TecnoSteel Engenharia",
        companySegment: "Engenharia Mecânica",
        companyCity: "Belo Horizonte",
        companyCEP: "30140-110",
    },
    {
        companyId: uuidv4(),
        companyCNPJ: "23.456.789/0001-34",
        companyName: "GreenPower Energia",
        companySegment: "Energia Renovável",
        companyCity: "Curitiba",
        companyCEP: "80010-000",
    }
]

