export interface CreateEvent {
    id?: number;
    titulo: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    capacidad: number;
    organizador_id: number;
}