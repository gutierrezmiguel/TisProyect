import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ova } from '../../models/ova.interface';
import { Score } from '../../models/score.interface';
import { OvaService } from '../../services/ova.service';
import { S3Service } from '../../services/s3.service';
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

  constructor(private ovaService: OvaService,private scoreService: ScoreService, private s3Service: S3Service, private aRoute: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.ova_id = Number(this.aRoute.snapshot.paramMap.get("id_ova"))
    this.user_id = Number(localStorage.getItem("id"))
    this.getOva(this.ova_id);

    
  }

  getOva( id_ova: number){
    this.ovaService.getOva(id_ova).subscribe(
      (response: any)=>{
        this.ova = response;
        console.log(this.ova);
        console.log(this.ova.ovaLink);
        
     this.downloadOva();
        
        
        
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

  downloadOva(){
    this.s3Service.downloadFile(this.ova.keyS3).subscribe(
      
      (response: Blob)=>{

        const blob = new Blob([response],{type:'image/png'})
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        console.log('success');
        
      
        
      }
    )
  }



}
