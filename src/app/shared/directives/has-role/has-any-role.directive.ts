import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject} from 'rxjs';
import {FindCommentElementInTwoArraysHelper} from "../../helpers/find-comment-element-in-two-arrays.helper";
import {RoleService} from "../../services/role/role.service";

// <ng-container *appHasAnyRole="['ROLE_ADMIN', 'ROLE_B']">
// </ng-container>

@Directive({
    selector: '[appHasAnyRole]'
})
export class HasAnyRoleDirective implements OnInit, OnDestroy {

    // the role the user must have
    @Input() appHasAnyRole: string[];

    stop$ = new Subject();

    isVisible = false;

    roles: string[];

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private roleService: RoleService
    ) {
    }

    ngOnInit() {

        if (!Array.isArray(this.appHasAnyRole))
            throw "appHasAnyRole must be an array of roles"

        //  We subscribe to the roles$ to know the roles the user has
        this.roles = this.roleService.getRoles();

        // If he doesn't have any roles, we clear the viewContainerRef
        if (!this.roles) {
            this.viewContainerRef.clear();
        }
        // If the user has the role needed to
        // render this component we can add it


        if (this.hasAnyRole(this.roles, this.appHasAnyRole)) {
            // If it is already visible (which can happen if
            // his roles changed) we do not need to add it a second time
            if (!this.isVisible) {
                // We update the `isVisible` property and add the
                // templateRef to the view using the
                // 'createEmbeddedView' method of the viewContainerRef
                this.isVisible = true;
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        } else {
            // If the user does not have the role,
            // we update the `isVisible` property and clear
            // the contents of the viewContainerRef
            this.isVisible = false;
            this.viewContainerRef.clear();
        }

    }

    hasAnyRole(inputRoles: string[], requiredRoles: string[]): boolean {
        return FindCommentElementInTwoArraysHelper.get(inputRoles, requiredRoles);
    }

    // Clear the subscription on destroy
    ngOnDestroy() {
        this.stop$.next(null);
    }
}
