import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ova } from '../../models/ova.interface';
import { Score } from '../../models/score.interface';
import { OvaService } from '../../services/ova.service';
import { ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-ova-details',
  templateUrl: './ova-details.component.html',
  styleUrls: ['./ova-details.component.scss']
})



export class OvaDetailsComponent implements OnInit {

  private ova_id : number;
  private user_id: number;
  private ova : Ova;

  constructor(private ovaService: OvaService,private scoreService: ScoreService, private aRoute: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {

     this.ova_id = Number(this.aRoute.snapshot.paramMap.get("id_ova"))
     this.user_id = Number(localStorage.getItem("id"))

     console.log(this.ova_id);
     this.getOva(this.ova_id);

    
  }

  getOva( id_ova: number){
    this.ovaService.getOva(id_ova).subscribe(
      (response: any)=>{
        this.ova = response;
        console.log(this.ova);
        
      }
    )
  }

  rateOva(rating: number){
    let newRate : any ={
      scoreId: {
          user: {
              idUser: this.user_id
          },
          ova: {
              idOva: this.ova_id
          }
      },
      scoreNumber: rating
  }
    this.scoreService.mergeScore(newRate).subscribe(
      (response: any)=>{
        console.log(response);
        
      }
    )

  }



}
