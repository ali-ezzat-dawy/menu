import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  PLATFORM_ID,
} from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AppService } from "src/app/app.service";
import { MenuItem } from "src/app/app.models";

@Component({
  selector: "app-add-dialog",
  templateUrl: "./add-dialog.component.html",
  styleUrls: ["./add-dialog.component.scss"],
})
export class AddDialogComponent implements OnInit {
  public imgUrl: any = "assets/images/others/noimage.png";
  public form!: UntypedFormGroup;
  @Output() onFileChange: EventEmitter<any> = new EventEmitter();
  @Output() onFileUploadClick: EventEmitter<any> = new EventEmitter();
  file: any;
  fileSize: any;
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public menuItem: MenuItem,
    public appService: AppService,
    public formBuilder: UntypedFormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      product_name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      product_description:'',
      product_price: [null, Validators.required],
      user_personal_image: [null],
      categoryId: [null, Validators.required],
    });

    if (this.menuItem) {
      this.form.patchValue({
        product_name: this.menuItem.name,
        product_description: this.menuItem.description,
        product_price: this.menuItem.price,
        user_personal_image: this.file,
        categoryId: this.menuItem.categoryId,
      });
      this.imgUrl = this.menuItem.image;
    }
    this.getCategories();
  }

  public onSelectFile(e: any) {
    this.file = e.target.files[0];
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;
      };
    }

    console.log(this.file);
    this.onFileChange.emit(this.file);
  }
  public clearInput() {
    if (this.file) {
      if (document.getElementById("singleFileUploader")) {
        (<HTMLInputElement>(
          document.getElementById("singleFileUploader")
        )).value = "";
      }
    }
  }

  public deleteFile() {
    const message = this.appService.getTranslateValue("MESSAGE.SURE_DELETE");
    let dialogRef = this.appService.openConfirmDialog("", message!);
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.clearInput();
      }
    });
  }
  public fileUploadClick() {
    this.onFileUploadClick.emit();
  }

  public getCategories() {
    this.appService.getCategories().subscribe((categories) => {
      this.appService.Data.categories = categories.allCategories;
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      if (this.file) {
        let formData = new FormData();
        formData.append("categoryId", this.form.value.categoryId);
        formData.append("product_name", this.form.value.product_name);
        formData.append("product_price", this.form.value.product_price);
        formData.append(
          "product_description",
          this.form.value.product_description
        );
        formData.append("user_personal_image", this.file);
        this.dialogRef.close(formData);
      } else {
        let formDataWithoutFile = {
          product_name: this.form.value.product_name,
          product_description: this.form.value.product_description,
          product_price: this.form.value.product_price,
          categoryId: this.form.value.categoryId,
        };
        this.dialogRef.close(formDataWithoutFile);
        console.log("formData", formDataWithoutFile);
      }
    }
  }
}
