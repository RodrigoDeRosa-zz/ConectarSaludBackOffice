import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  specialitiesData = {
    "total": 69,
    "by_specialty": [
      {
        "specialty": "Medicina general",
        "count": 42
      },
      {
        "specialty": "Pediatría",
        "count": 27
      }
    ]
  };
  specialitiesTitle = "Cantidad de consultas por especialidad";
  specialitiesSeriesName = "Consultas";

  ratingsData = [
    {
      "date": "23-08-2020",
      "average_score": 4.32
    },
    {
      "date": "24-08-2020",
      "average_score": 1.00
    },
    {
      "date": "23-09-2020",
      "average_score": 3.20
    }
  ];
  ratingsTitle = "Promedio de calificaciones diarias";
  ratingsSeriesName = "Calificación";
  ratingsXAxisTitle = "Día";

  constructor() { }

  ngOnInit() {
  }

}
