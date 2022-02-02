import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rating, Score, ScoreIDB } from '../models/score.interface';
import Dexie from 'dexie';
import { CheckStatusService } from './check-status.service';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';



@Injectable({
    providedIn: 'root'
})
export class ScoreService {

    private db: Dexie;
    private table: Dexie.Table<ScoreIDB, any> = null;

    baseUrl = environment.apiBaseUrl + 'score/'


    onlineStatusCheck: any = OnlineStatusType;
    status: OnlineStatusType; //Enum provided by ngx-online-status
    offline: any;

    constructor(private onlineStatusService: OnlineStatusService,private checkStatusService: CheckStatusService, private http: HttpClient) {


        this.startIndexedDB();

        this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
            // Retrieve Online status Type
            this.status = status;
            this.offline = (status === this.onlineStatusCheck.OFFLINE)
            
            if(!this.offline){
                console.log("ONLINE");
                this.sendIndexedToApi();
            }
            
            
           
            
            
          });

    }

    private startIndexedDB() {
        this.db = new Dexie('db-PWA');
        this.db.version(1).stores({
            scoreIDB: '++id'
        })
        this.table = this.db.table('scoreIDB');
    }

    public async saveRatingIndexDB(rating: ScoreIDB) {

        await this.table.add(rating);
        const todosRatings: ScoreIDB[] = await this.table.toArray();
        console.log('Ratings ', todosRatings);

    }

    public async sendIndexedToApi() {


        const todosRatings: ScoreIDB[] = await this.table.toArray()

        console.log('Ratings ', todosRatings);


        for (const rating of todosRatings) {
            this.mergeScore(rating).subscribe(
                (async response => {
                    await this.table.delete(rating.id)
                }
                )
            );

        }
    }

    public mergeScore(score: ScoreIDB): Observable<any> {

        if (this.checkStatusService.status === this.onlineStatusCheck.OFFLINE) {
            this.saveRatingIndexDB(score)
        }
        else {

            console.log(score);


            let newScore: Rating = {
                scoreId: {
                    user: {
                        idUser: score.userId
                    },
                    ova: {
                        idOva: score.ovaId
                    }
                },
                scoreNumber: score.scoreNumber
            }
            return this.http.post<any>(this.baseUrl + 'merge', newScore);
        }

    }

    public scorePerUser(id_ova: number, id_user: number): Observable<Score> {

        return this.http.get<Score>(this.baseUrl + id_ova + "/" + id_user);
    }




}
