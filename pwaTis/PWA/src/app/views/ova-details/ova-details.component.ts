import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ova } from '../../models/ova.interface';
import { Score } from '../../models/score.interface';
import { OvaService } from '../../services/ova.service';
import { S3Service } from '../../services/s3.service';
import { ScoreService } from '../../services/score.service';
import { saveAs } from 'file-saver';
import { privatemimeTypes } from './ema-list';



@Component({
  selector: 'app-ova-details',
  templateUrl: './ova-details.component.html',
  styleUrls: ['./ova-details.component.scss']
})



export class OvaDetailsComponent implements OnInit {

  private ova_id : number;
  private user_id: number;
  public ova : Ova;
  

  

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
    
    let extension  = this.ova.keyS3;
    extension = extension.substring(extension.indexOf('.')+1)

    const type = privatemimeTypes.find(element=> element.extension == extension)
    console.log(extension);
    
    
    this.s3Service.downloadFile(this.ova.keyS3).subscribe(

      (response: Blob)=>{

        
        const blob = new Blob([response],{type:type.extensionConverted})
        saveAs(blob,this.ova.title);
        
      
        
      }
    )
  }



}
