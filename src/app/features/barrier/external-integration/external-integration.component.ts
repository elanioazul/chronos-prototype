import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-external-integration',
  templateUrl: './external-integration.component.html',
  styleUrls: ['./external-integration.component.scss']
})
export class ExternalIntegrationComponent {
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private authConfigService: AuthService
  ) {
  }

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    if (token)
    this.authConfigService.saveToken(token);
    this.router.navigate(['/visor']);
  }
}
