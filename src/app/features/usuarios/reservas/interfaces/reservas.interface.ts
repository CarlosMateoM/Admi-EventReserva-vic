export interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  capacidad: number;
  organizador_id: number;
  created_at: string;
  updated_at: string;
}

export interface Reserva {
  id: number;
  usuario_id: number;
  evento_id: number;
  estado: string;
  created_at: string;
  updated_at: string;
  evento: Evento;
}

export interface UpdateReserva {
  id: number;
  estado: string;
}
  