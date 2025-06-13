import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { FormsModule } from '@angular/forms';
import { EstadisticaEvento, EstadisticaService } from './estadistica.service';
echarts.use([GridComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | BarSeriesOption
>;

@Component({
  selector: 'app-estadisticas',
  imports: [FormsModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {
  currentDate: string = '';
  selectedDate: string = '';
  estadisticas: EstadisticaEvento[] = [];

  constructor(private estadisticaService: EstadisticaService) { }
  ngOnInit(): void {
    this.currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    // Si no hay fecha seleccionada, usa la actual
    const fecha = this.selectedDate
      ? new Date(this.selectedDate)
      : new Date();

    // Convierte a timestamp Unix (segundos)
    const unixTimestamp = Math.floor(fecha.getTime() / 1000);

    this.estadisticaService.getEstadisticas(unixTimestamp.toString()).subscribe(data => {
      this.estadisticas = data;

      const nombres = data.map(e => e.evento);
      const totales = data.map(e => e.total);

      const myChart = echarts.init(document.getElementById('main'));

      const option: EChartsOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {

          containLabel: true
        },
        legend: {
          data: ['Reservas']
        },
        xAxis: {
          type: 'category',
          name: 'Eventos',
          axisTick: {
            alignWithLabel: true
          },
          data: nombres
        },
        yAxis: [{
          type: 'value',
          name: 'Reservas',
        }],
        series: [
          {
            name: 'Reservas',
            type: 'bar',
            data: totales
          }
        ]
      };

      myChart.setOption(option);
    });
  }
}
