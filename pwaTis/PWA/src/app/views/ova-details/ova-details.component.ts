import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ova } from '../../models/ova.interface';
import { Rating, Score, ScoreIDB } from '../../models/score.interface';
import { OvaService } from '../../services/ova.service';
import { S3Service } from '../../services/s3.service';
import { ScoreService } from '../../services/score.service';
import { saveAs } from 'file-saver';
import { privatemimeTypes } from './ema-list';
import { CheckStatusService } from '../../services/check-status.service';
import { OnlineStatusType } from 'ngx-online-status';





@Component({
  selector: 'app-ova-details',
  templateUrl: './ova-details.component.html',
  styleUrls: ['./ova-details.component.scss']
})




export class OvaDetailsComponent implements OnInit {

  list: Array<any> = [];

  private ova_id: number;
  private user_id: number;
  public score: Score = { ovaId: null, userId: null, scoreNumber: null };
  public ova: Ova;






  public newScore: Rating = {
    "scoreId": {
      "user": {
        "idUser": 14
      },
      "ova": {
        "idOva": 5
      }
    },
    "scoreNumber": 5

  }



  constructor(private ovaService: OvaService, private scoreService: ScoreService, private s3Service: S3Service, private aRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.ova_id = Number(this.aRoute.snapshot.paramMap.get("id_ova"))
    this.user_id = Number(localStorage.getItem("id"))

    this.scoreService.scorePerUser(this.ova_id, this.user_id).subscribe(
      (res: Score) => {
        if (res.scoreNumber != null) {
          this.score = res;
        }
      }

    );

    this.ova = this.ovaService.getOvaOffline(this.ova_id)

    if (!this.ova) {
      this.ovaService.getOvaOnline(this.ova_id).subscribe(
        (response: Ova) => {

          this.ova = response;
        },

        (error: any) => {
          this.router.navigateByUrl("Ovas")
        }
      )
    }

  }

  volver() {
    this.router.navigateByUrl("Ovas")
  }

  getOva(id_ova: number) {

    this.ova = this.ovaService.getOvaOffline(id_ova)
  }

  rateOva(rating: number) {





    console.log("Entró con rating de ", rating);



    let newScore: ScoreIDB = {
      userId: this.user_id,
      ovaId: this.ova_id,
      scoreNumber: rating
    }




    if (rating) {

      {
        this.scoreService.mergeScore(newScore).subscribe(
          (response: any) => {
            console.log("Calificado");

          }
        )

      }

    }




  }

  downloadOva() {

    let extension = this.ova.keyS3;
    extension = extension.substring(extension.indexOf('.') + 1)

    const type = privatemimeTypes.find(element => element.extension == extension)


    this.s3Service.downloadFile(this.ova.keyS3).subscribe(

      (response: Blob) => {


        const blob = new Blob([response], { type: type.extensionConverted })
        saveAs(blob, this.ova.title);



      }
    )
  }



}



