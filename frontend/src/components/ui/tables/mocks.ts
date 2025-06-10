import { v4 as uuidv4 } from "uuid"
import { ServiceOrder } from "./ServiceOrderTable"
import { Company } from "./TableCompanies"
import { Alert } from "./AlertTable"
import { Product } from "./StockTable"
import { Employee } from "./EmployeeTable"

export const mockAlerts: Alert[] = [
  {
    alertId: uuidv4(),
    alertTitle: "Doc à exp",
    alertType: "Documentação",
    alertData: "08/05/2025",
    alertDescription: "NR35",
    idCollaborator: uuidv4()
  },
  {
    alertId: uuidv4(),
    alertTitle: "Bx Estoque",
    alertType: "Estoque",
    alertData: "10/05/2025",
    alertDescription: "Estoque baixo",
    idCollaborator: null
  },
  {
    alertId: uuidv4(),
    alertTitle: "Doc à exp",
    alertType: "Documentação",
    alertData: "15/05/2025",
    alertDescription: "NR12",
    idCollaborator: uuidv4()
  },
  {
    alertId: uuidv4(),
    alertTitle: "Bx Estoque",
    alertType: "Estoque",
    alertData: "18/05/2025",
    alertDescription: "Estoque baixo",
    idCollaborator: null
  }
];

 export const mockEmployee: Employee[] = [
        {
            employeeId:uuidv4(),
            employeeName: "Durval Machado Bragantino",
            employeeFunction: "Soldador",
            employeeCPF: "70702266610",
            employeeCellphone: "999999999",
            employeeStatus: true
        },
           {
            employeeId:uuidv4(),
            employeeName: "Luiz da Rocha",
            employeeFunction: "Eletricista",
            employeeCPF: "70201266300",
            employeeCellphone: "988999999",
            employeeStatus: false
        },
           {
            employeeId:uuidv4(),
            employeeName: "Rafael Barbosa",
            employeeFunction: "Eletricista",
            employeeCPF: "61508860050",
            employeeCellphone: "999999999",
            employeeStatus: true
        },
    ]


export const mockProducts: Product[] = [
  {
    productId: uuidv4(),
    productName: "Bota de Segurança PVC",
    productSize: "42",
    productQuantity: 125,
    productCA: "CA-EPI-2023-001",
    productColor: "pre", // preto
    productCI: "EPI-BT-042",
    productData: "2023-10-15"
  },
  {
    productId: uuidv4(),
    productSize: "P",
    productName: "Capacete de Segurança",
    productQuantity: 68,
    productCA: "CA-EPI-2023-042",
    productColor: "azu", // azul
    productCI: "EPI-CP-AZ",
    productData: "2023-09-20"
  },
  {
    productId: uuidv4(),
    productName: "Capacete de Segurança",
    productSize: "M",
    productQuantity: 92,
    productCA: "CA-EPI-2023-015",
    productColor: "bra", // branco
    productCI: "EPI-CP-BR",
    productData: "2023-11-05"
  },
  {
    productId: uuidv4(),
    productName: "Luvas de Raspa Couro",
    productSize: "G",
    productQuantity: 210,
    productCA: "CA-EPI-2023-078",
    productColor: "mar", // marrom
    productCI: "EPI-LV-036",
    productData: "2023-08-12"
  },
  {
    productId: uuidv4(),
    productName: "Óculos de Proteção",
    productSize: "Único",
    productQuantity: 45,
    productCA: "CA-EPI-2023-033",
    productColor: "cin", // cinza
    productCI: "EPI-OC-001",
    productData: "2023-12-01"
  },
  {
    productId: uuidv4(),
    productName: "Cinto de Segurança",
    productSize: "GG",
    productQuantity: 28,
    productCA: "CA-EPI-2023-056",
    productColor: "ver", // vermelho
    productCI: "EPI-CT-012",
    productData: "2023-07-22"
  },
  {
    productId: uuidv4(),
    productName: "Manga Refletiva 10cm",
    productSize: "Único",
    productQuantity: 320,
    productCA: "CA-SEG-2023-004",
    productColor: "ama", // amarelo
    productCI: "SEG-MG-010",
    productData: "2023-11-18"
  },
  {
    productId: uuidv4(),
    productName: "Fita de Sinalização",
    productSize: "50m",
    productQuantity: 85,
    productCA: "CA-SEG-2023-019",
    productColor: "lar", // laranja
    productCI: "SEG-FT-050",
    productData: "2023-10-30"
  }
];




 export const mockServiceOrder: ServiceOrder[] = [
    {
        NOS: uuidv4(),
        OpeningDate: "22/05/2025",
        Request: "Ana Maria Braga",
        Responsible: "Louro José",
        Status: "Em análise",
        Priority: "Baixa"
    },
    {
        NOS: uuidv4(),
        OpeningDate: "21/05/2025",
        Request: "Carlos Eduardo",
        Responsible: "Maria Silva",
        Status: "Em análise",
        Priority: "Média",
       
    },
    {
        NOS: uuidv4(),
        OpeningDate: "20/05/2025",
        Request: "Fernanda Lima",
        Responsible: "João Pedro",
        Status: "Aberta",
        Priority: "Alta",
     
    },
    {
        NOS: uuidv4(),
        OpeningDate: "19/05/2025",
        Request: "Ricardo Eletro",
        Responsible: "Técnico TI",
        Status: "Concluída",
        Priority: "Alta",
     
    },
    {
        NOS: uuidv4(),
        OpeningDate: "18/05/2025",
        Request: "Patrícia Abravanel",
        Responsible: "Equipe Infraestrutura",
        Status: "Cancelada",
        Priority: "Baixa"
    },
]

export const mockCompanies: Company[] = [
  {
    id: uuidv4(),
    cnpj: "12.345.678/0001-90",
    razao_social: "MetaService Soluções Industriais Ltda",
    nome_fantasia: "MetaService Industrial",
    segmento: "Manutenção Industrial",
    inscricao_estadual: "123.456.789.112",
    inscricao_municipal: "9876543",
    created_at: "2023-01-15T10:30:00Z",
    updated_at: "2023-06-20T14:45:00Z"
  },
  {
    id: uuidv4(),
    cnpj: "98.765.432/0001-12",
    razao_social: "TecnoSteel Engenharia S.A.",
    nome_fantasia: "TecnoSteel",
    segmento: "Engenharia Mecânica",
    inscricao_estadual: "987.654.321.112",
    inscricao_municipal: "1234567",
    created_at: "2023-02-20T09:15:00Z",
    updated_at: "2023-05-10T11:20:00Z"
  },
  {
    id: uuidv4(),
    cnpj: "23.456.789/0001-34",
    razao_social: "GreenPower Energia Renovável Ltda",
    nome_fantasia: "GreenPower",
    segmento: "Energia Renovável",
    inscricao_estadual: "456.789.123.112",
    created_at: "2023-03-10T14:00:00Z",
    updated_at: "2023-07-05T16:30:00Z"
  },
  {
    id: uuidv4(),
    cnpj: "45.678.912/0001-56",
    razao_social: "AgroFértil Comércio de Insumos Agrícolas",
    segmento: "Agronegócio",
    inscricao_municipal: "6543210",
    created_at: "2023-04-05T08:45:00Z",
    updated_at: "2023-08-15T10:10:00Z"
  },
  {
    id: uuidv4(),
    cnpj: "56.789.123/0001-78",
    razao_social: "VivaBem Saúde e Bem-Estar",
    nome_fantasia: "Clínica VivaBem",
    segmento: "Saúde",
    created_at: "2023-05-12T11:20:00Z",
    updated_at: "2023-09-01T09:30:00Z"
  }
];