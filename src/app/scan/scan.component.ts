import { Component, OnInit } from '@angular/core';
import Quagga from '@ericblade/quagga2';
import { ActionSheetController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {
  errorMessage: string = '';
  constructor(
    public actionSheetController: ActionSheetController,
    public toastController: ToastController
  ) {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please Scan Barcode!.',
      duration: 2000,
      position: 'top',
      cssClass: 'toastStyle',
    });
    toast.present();
  }

  ngOnInit() {
    this.presentToast();
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: '#interactive', // Or '#yourElement' (optional)
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment', // restrict camera type
          },
          area: {
            // defines rectangle of the detection
            top: '40%', // top offset
            right: '10%', // right offset
            left: '10%', // left offset
            bottom: '40%', // bottom offset
          },
        },
        decoder: {
          readers: ['ean_reader'],
        },
      },
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Initialization finished. Ready to start');

        //ビデオストリームの開始、画像の検索とデコード
        Quagga.start();

        Quagga.onDetected((res: any) => {
          presentActionSheet(this.actionSheetController);
          window.alert(`code: ${res.codeResult.code}`);
        });
      }
    );

    /**
     *アクションシートを開く
     * @param actionSheetController
     */
    async function presentActionSheet(
      actionSheetController: ActionSheetController
    ) {
      const actionSheet = await actionSheetController.create({
        header: 'Albums',
        cssClass: 'my-custom-class',
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            icon: 'trash',
            id: 'delete-button',
            data: {
              type: 'delete',
            },
            handler: () => {
              console.log('Delete clicked');
            },
          },
          {
            text: 'Share',
            icon: 'share',
            data: 10,
            handler: () => {
              console.log('Share clicked');
            },
          },
          {
            text: 'Play (open modal)',
            icon: 'caret-forward-circle',
            data: 'Data value',
            handler: () => {
              console.log('Play clicked');
            },
          },
          {
            text: 'Favorite',
            icon: 'heart',
            handler: () => {
              console.log('Favorite clicked');
            },
          },
          {
            text: 'Cancel',
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            },
          },
        ],
      });
      await actionSheet.present();

      const { role, data } = await actionSheet.onDidDismiss();
      console.log('onDidDismiss resolved with role and data', role, data);
    }
  }
}
