import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rating, Score, ScoreIDB } from '../models/score.interface';
import Dexie from 'dexie';
import { CheckStatusService } from './check-status.service';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import Swal from 'sweetalert2'




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

    constructor(private onlineStatusService: OnlineStatusService, private checkStatusService: CheckStatusService, private http: HttpClient) {


        this.startIndexedDB();

        this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
            // Retrieve Online status Type
            this.status = status;
            this.offline = (status === this.onlineStatusCheck.OFFLINE)

            if (!this.offline) {
                Swal.fire({
                    title: 'Reconectado',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    width: '20%',
                    backdrop: false,
                    timer: 3000,
                    toast: true,
                    position: 'top-end'
                }).then(
                    response =>{
                        
                this.sendIndexedToApi();
                    }
                )
            }
            else{
                Swal.fire({
                    title: 'Desconectado',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                    width: '20%',
                    backdrop: false,
                    timer: 3000,
                    toast: true,
                    position: 'top-end'
                })
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

        Swal.fire({
            title: 'Sin conexión a internet, guardaremos su calificación localmente hasta que se reanude la conexión',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            width: '20%',
            backdrop: false,
            timer: 3000,
            toast: true,
            position: 'top-end'
        })

        await this.table.add(rating);
        const todosRatings: ScoreIDB[] = await this.table.toArray();
        console.log('Ratings ', todosRatings);

    }

    public async sendIndexedToApi() {


        const todosRatings: ScoreIDB[] = await this.table.toArray()

        if (todosRatings.length > 0) {

            Swal.fire({
                title: 'Conexión retomada, sincronizaremos su información con el servidor',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                width: '20%',
                backdrop: false,
                timer: 3000,
                toast: true,
                position: 'top-end'
            }).then(
                response => {
                    for (const rating of todosRatings) {
                        this.mergeScore(rating).subscribe(
                            (async response => {
                                await this.table.delete(rating.id)
                            }
                            )
                        );

                    }
                }
            )






        }
        console.log();



    }

    public mergeScore(score: ScoreIDB): Observable<any> {

        if (this.offline) {
            this.saveRatingIndexDB(score)
        }
        else {

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

            Swal.fire({
                title: 'Ova calificado',
                icon: 'success',
                confirmButtonText: 'aceptar',
                width: '20%',
                backdrop: false,
                timer: 3000,
                toast: true,
                position: 'bottom-end'
            })
            return this.http.post<any>(this.baseUrl + 'merge', newScore);

        }

    }

    public scorePerUser(id_ova: number, id_user: number): Observable<Score> {

        return this.http.get<Score>(this.baseUrl + id_ova + "/" + id_user);
    }




}
