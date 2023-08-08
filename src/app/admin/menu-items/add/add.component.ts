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
  constructor(
    public appService: AppService,
    public formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit(): void {
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



    fileChange(event : any){
      this.file = event.target.files[0]
      console.log( "file" , this.file )
    }
    public fileUploadClick(){ 
      this.onFileUploadClick.emit();
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
