import { Component, OnInit } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  FormGroup,
} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AppSettings, Settings } from "src/app/app.settings";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm!: UntypedFormGroup;
  public hide = true;
  public bgImage: any;
  public settings: Settings;
  constructor(
    public fb: UntypedFormBuilder,
    public Router: Router,
    private sanitizer: DomSanitizer,
    public appSettings: AppSettings,
    private _AuthService: AuthService
  ) {}
  error: String = "";

  ngOnInit(): void {
    this.bgImage = this.sanitizer.bypassSecurityTrustStyle(
      "url(assets/images/others/login.jpg)"
    );
    this.loginForm = this.fb.group({
      user_phonenumber: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      user_password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      rememberMe: true,
    });
  }

  onLoginFormSubmit(formInfo: FormGroup) {
    this._AuthService.login(formInfo.value).subscribe(
      (res: any) => {
        localStorage.setItem("userToken", JSON.stringify(res.user.userToken));
        this._AuthService.setUserData();
        this.Router.navigate(["/admin"]);
      },
      (serverLoginError: any) => {
        if (serverLoginError.status === 400) {
          this.error = 'the email or password is incorrect'
        }
      }
    );
  }
}