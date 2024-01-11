import { Component, Inject, OnInit, PLATFORM_ID , Output, EventEmitter, Input } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import { AppService } from "src/app/app.service";
import { MenuItem } from "src/app/app.models";
import { ActivatedRoute } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  public form!: UntypedFormGroup;
  private sub: any;
  public id: any;
  public showImage: boolean = false;
  file : any; 
  @Output() onFileChange: EventEmitter<any> = new EventEmitter(); 
  @Output() onFileUploadClick: EventEmitter<any> = new EventEmitter();
  @Input('fileSize') fileSize = 500;  
  @Input('acceptTypes') acceptTypes:any; 
  imgFile: any;
  base64: any;
  constructor(
    public appService: AppService,
    public formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit(): void {
    if(this.base64){ 
      this.file.push({
        name: 'image-' + new Date().getDate, 
        content: this.base64,
        size: null
      })
    } 
    this.form = this.formBuilder.group({
      product_name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      product_description: [
        null,
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      product_price: [null, Validators.required],
      user_personal_image: [null, Validators.required],
      categoryId: [null, Validators.required],
    });
    this.getCategories();
    this.sub = this.activatedRoute.params.subscribe((params) => {
      if (params["id"]) {
        this.id = params["id"];
        this.getMenuItemById();
      } else {
        this.showImage = true;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getCategories() {
    if (!this.appService.Data.categories.length) {
      this.appService.getCategories().subscribe((categories) => {
        this.appService.Data.categories = categories.allCategories;
      });
    }
  }
  public getMenuItemById() {
    this.appService.getMenuItemById(this.id).subscribe((menuItem: MenuItem) => {
      this.form.patchValue(menuItem);
      if (isPlatformBrowser(this.platformId)) {
        this.appService.convertImgToBase64(
          menuItem.user_personal_image.medium,
          (dataUrl: string) => {
            this.showImage = true;
            this.form.controls.user_personal_image.patchValue(
              dataUrl.toString()
            );
          }
        );
      }
    });
  }




    // public fileChange(event:any){ 
    //   this.file = event.target.files[0]
    //   console.log(this.file)
    // } 
    public fileChange(event:any){  
      this.file = event.target.files[0]
      if(this.file){
        for (var i = 0; i < event.files; i++){
          const reader = new FileReader(); 
          if (this.file) {  
            const message = this.appService.getTranslateValue('MESSAGE.FILE_SIZE', this.fileSize.toString()); //'The file size cannot exceed '+this.fileSize.toString()+' kb.';

            let dialogRef = this.appService.openAlertDialog(message!); 
            dialogRef.afterClosed().subscribe(dialogResult => {
              this.clearInput();  
            });  
          } 
          else {  
            let name = event.files[i].name;
            let size = event.files[i].size; 
            reader.readAsDataURL(event.files[i]);
            reader.onload = () => {  
              var img = new Image(); 
              img.onload = () => { 

                this.file.push({
                  "name": name, 
                  "size": size, 
                  "content": reader.result 
                }); 
                this.onFileChange.emit(this.file);  
              }; 
              img.src = reader.result as string; 
            } 
          }  
        }
      }  
    }
    public fileUploadClick(){ 
      this.onFileUploadClick.emit();
    }
  
    public clearInput(){
      if(this.file.length == 0){  
        if(document.getElementById('singleFileUploader')){ 
          (<HTMLInputElement>document.getElementById('singleFileUploader')).value = ''; 
        }
      }  
    } 
  
    public deleteFile() {  
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
      let dialogRef = this.appService.openConfirmDialog('', message!);
      dialogRef.afterClosed().subscribe(dialogResult => {
        if(dialogResult){
          this.file.length = 0;          
          this.onFileChange.emit(this.file);
          this.clearInput();   
        }
      });  
    }  
  public onSubmit() {
    let formData = new FormData()
    formData.append("categoryId" , this.form.value.categoryId)
    formData.append("product_name" , this.form.value.product_name)
    formData.append("product_price" ,this.form.value.product_price )
    formData.append("product_description" , this.form.value.product_description)
    formData.append("user_personal_image" , this.file )

    this.appService.addItem(formData).subscribe(
      (response) => {console.log(response)},(error) => {console.log(error);}
    );
  }
}
