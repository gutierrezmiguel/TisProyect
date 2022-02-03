import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rating, Score, ScoreIDB } from '../models/score.interface';
import Dexie from 'dexie';
import { CheckStatusService } from './check-status.service';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import Swal from 'sweetalert2'
import { User, UserResponse } from '../models/user.interface';
import { Ova } from '../models/ova.interface';
import { Router } from '@angular/router';




@Injectable({
    providedIn: 'root'
})
export class SyncService {

    private db: Dexie;
    private tableScores: Dexie.Table<ScoreIDB, any> = null;
    private tableUsers: Dexie.Table<UserResponse, any> = null;
    private tableOvas: Dexie.Table<Ova, any> = null;

    baseUrl = environment.apiBaseUrl + ''


    onlineStatusCheck: any = OnlineStatusType;
    status: OnlineStatusType; //Enum provided by ngx-online-status
    offline: any;

    constructor(private router: Router,private onlineStatusService: OnlineStatusService, private checkStatusService: CheckStatusService, private http: HttpClient) {
        this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
            // Retrieve Online status Type
            this.status = status;
            this.offline = (status === this.onlineStatusCheck.OFFLINE)

            if (!this.offline) {
                Swal.fire({
                    title: 'Reconectado',
                    icon: 'success',
                    showConfirmButton: false,
                    width: '20%',
                    backdrop: false,
                    timer: 3000,
                    toast: true,
                    position: 'top-end'
                }).then(
                    response => {

                        this.sendIndexedToApi();
                        this.setOvasIndexDB();
                    }
                )
            }
            else{
                Swal.fire({ 
                    title: 'Desconectado',
                    icon: 'warning',
                    showConfirmButton: false,
                    width: '20%',
                    backdrop: false,
                    timer: 3000,
                    toast: true,
                    position: 'top-end',
                })
            }





        });

    }

    public startIndexedDB() {
        this.db = new Dexie('db-PWA');
        this.db.version(1).stores({
            scoreIDB: '++id'
        })

        this.db.version(2).stores({
            userResponse: 'idUser'
        })

        this.db.version(3).stores({
            ova: 'idOva'
        })

        this.tableUsers = this.db.table('userResponse')
        this.tableScores = this.db.table('scoreIDB');
        this.tableOvas = this.db.table('ova')


    }

    public async setOvasIndexDB() {

        const todosOvas: Ova[] = await this.tableOvas.toArray()

        await this.tableOvas.bulkDelete(todosOvas);
            
        this.deleteOvasDB().then(
            (response =>{
                this.getOvas().subscribe(
                    (response: Ova[]) => {
                        this.tableOvas.bulkAdd(response).then(
                            response => {
                                console.log("Ovas añadidos");
        
                            }
                        )
                    }
                )
            })
        )

        
    }

    public async setUsersIndexDB() {
        this.getAllUsers().subscribe(
            (response: UserResponse[]) => {
                this.tableUsers.bulkAdd(response).then(
                    response => {
                        console.log("Usuarios añadidos a la idb");

                    }
                )
            }
        )
    }

    public async saveRatingIndexDB(rating: ScoreIDB) {

        Swal.fire({
            title: 'Sin conexión a internet. Guardaremos su calificación localmente hasta que se reanude la conexión',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            width: '40%',
            backdrop: false,
            timer: 1000,
            toast: true,
            position: 'top-end'
        }).then(
            (response =>{
                this.router.navigateByUrl('Ovas')
            })
        )

        await this.tableScores.add(rating);
        const todosRatings: ScoreIDB[] = await this.tableScores.toArray();
        console.log('Ratings ', todosRatings);

    }

    public async sendIndexedToApi() {


        const todosRatings: ScoreIDB[] = await this.tableScores.toArray()

        if (todosRatings.length > 0) {

            Swal.fire({
                title: '¡Conexión retomada! Estamos sincronizando su información con el servidor',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                width: '40%',
                backdrop: false,
                timer: 3000,
                toast: true,
                position: 'top-end'
            }).then(
                response => {
                    for (const rating of todosRatings) {
                        this.mergeScore(rating).subscribe(
                            (async response => {
                                await this.tableScores.delete(rating.id)
                            }
                            )
                        );

                    }
                }
            )



        }
        console.log();



    }

    public async deleteOvasDB() {

        const todosOvas: Ova[] = await this.tableOvas.toArray()

        for (const ova of todosOvas) {
            (async response => {
                await this.tableOvas.delete(ova.idOva)
            }
            )

        }


    }

    public async getOvasDB() {
        const ovas = await this.tableOvas.toArray();

        return ovas;
    }

    public async logIn(user: User) {
        const users = await this.tableUsers.toArray();

        const findedUser = users.find(DBuser => DBuser.username === user.username && DBuser.password === user.password)
        console.log(findedUser);

        return findedUser;
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
                title: '¡Se ha calificado el ova correctamente!',
                icon: 'success',
                width: '20%',
                showConfirmButton: false,
                backdrop: false,
                timer: 1000,
                toast: true,
                position: 'bottom-end'
            }).then(
                (response =>{
                })
            )
            return this.http.post<any>(this.baseUrl + 'score/merge', newScore);

        }

    }

    public getAllUsers(): Observable<UserResponse[]> {
        return this.http.get<UserResponse[]>(this.baseUrl + 'user/all');
    }

    public scorePerUser(id_ova: number, id_user: number): Observable<Score> {

        return this.http.get<Score>(this.baseUrl + "score/" + id_ova + "/" + id_user);
    }

    public getOvas(): Observable<Ova[]> {
        return this.http.get<Ova[]>(this.baseUrl + 'ova/list');
    }





}
