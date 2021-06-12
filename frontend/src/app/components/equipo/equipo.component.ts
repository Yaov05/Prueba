import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../../servicios/equipo.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  constructor(public equipoService: EquipoService) { }

  ngOnInit(): void {
    this.getEquipos();
  }

  getEquipos() {
    this.equipoService.obtenerEquipos().subscribe(
      res => {
        this.equipoService.equipos = res;
      },
      err => console.log(err)
    );
  }

  agregarEquipo(form: NgForm) {
    this.equipoService.registrarEquipo(form.value).subscribe(
      res => {
        this.getEquipos();
        form.reset();
      },
      err => console.log(err)
    )
  }

  borrarEquipo(nombre: String) {
    if (confirm('¿Esta seguro de que desea eliminar el equipo?')) {
      this.equipoService.eliminarEquipo(nombre).subscribe(
        (res) => {
          this.getEquipos();
        },
        (err) => console.log(err)
      );
    }
  }

  partido(form: NgForm){
    this.equipoService.partidos(form.value).subscribe(
      (res) => {
        this.getEquipos();
      },
      (err) => console.log(err)
    );
  }
}
