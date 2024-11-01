import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AllowedOrganizationTypesEnum} from '../../../../shared/enums/allowed-organization-types.enum';
import {AllowedOrganizationTypes} from '../../../../shared/types/allowed-organization.types';
import {CardModule} from 'primeng/card';
import {
    AllowedOrganizationTypesComponent
} from '../../../admin/admin-material/components/allowed-organization-types/allowed-organization-types.component';
import {NgForOf, NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {Role} from '../../../../shared/enums/role';
import {HasAnyRolePipeModule} from '../../../../shared/pipes/has-any-role/has-any-role-pipe.module';

@Component({
    selector: 'app-video-card',
    templateUrl: './video-card.component.html',
    styleUrl: './video-card.component.scss',
    imports: [
        CardModule,
        AllowedOrganizationTypesComponent,
        NgForOf,
        Button,
        HasAnyRolePipeModule,
        NgIf
    ],
    standalone: true
})
export class VideoCardComponent {

    @Input() videoUrl: string;

    @Input()header: string;
    @Input() allowedOrganizationTypes: AllowedOrganizationTypes[] = [];

    @Output() deleteButtonEvent = new EventEmitter();

    youtubeEmbedBaseUrl: string = 'https://www.youtube.com/embed';
    vimeoEmbedBaseUrl: string = 'https://player.vimeo.com/video';
    dailymotionEmbedBaseUrl: string = 'https://www.dailymotion.com/embed/video';

    sanitizedUrl: SafeResourceUrl;

    @Input()
    deleteButtonIsLoading: boolean = false;

    constructor(
        private sanitizer: DomSanitizer) {}

    async ngOnInit() {
        if (this.videoUrl) {
            if (this.isValidYouTubeUrl(this.videoUrl)) {
                const youTubeVideoId = this.getYouTubeVideoId(this.videoUrl)
                this.videoUrl = this.embedToYouTube(youTubeVideoId);
                this.sanitizedUrl = this.sanitizeUrl(this.videoUrl);
                return;
            }

            if (this.isValidVimeoUrl(this.videoUrl)) {
                const vimeoId = this.getVimeoVideoId(this.videoUrl)
                this.videoUrl = this.embedToVimeo(vimeoId);
                this.sanitizedUrl = this.sanitizeUrl(this.videoUrl);
                return;
            }

            if (this.isValidDailymotionUrl(this.videoUrl)) {
                const dailyMotionVideoId = this.getDailymotionVideoId(this.videoUrl)
                this.videoUrl = this.embedToDailymotion(dailyMotionVideoId);
                this.sanitizedUrl = this.sanitizeUrl(this.videoUrl);
                return;
            }

            throw Error('invalid videoUrl!');
        } else {
            throw Error('variable videoUrl must not be null!');
        }
    }

    sanitizeUrl(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    //####HANDLE YOUTUBE EMBED START###############################################################################################################
    isValidYouTubeUrl(url: string) {
        const youtubeHostRegex = /^https:\/\/(?:www\.)?youtube\.com(\/.*)?$/;
        return youtubeHostRegex.test(url);
    }

    getYouTubeVideoId(url: string) {
        const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(youtubeRegex);

        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    embedToYouTube(youtubeId: string): string {
        return `${this.youtubeEmbedBaseUrl}/${youtubeId}`;
    }
    //####HANDLE YOUTUBE EMBED END###############################################################################################################


    //####HANDLE VIMEO EMBED START###############################################################################################################
    isValidVimeoUrl(url: string) {
        const vimeoRegex = /^(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/(\d+)|player\.vimeo\.com\/video\/(\d+))$/;
        return vimeoRegex.test(url);
    }

    getVimeoVideoId(url: string) {
        const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/(\d+)|player\.vimeo\.com\/video\/(\d+))/;
        const match = url.match(vimeoRegex);

        if (match) {
            return match[1] || match[2];
        }

        return null;
    }

    embedToVimeo(youtubeId: string): string {
        return `${this.vimeoEmbedBaseUrl}/${youtubeId}`;
    }
    //####HANDLE VIMEO EMBED END###############################################################################################################


    //####HANDLE DAILYMOTION EMBED START###############################################################################################################
    isValidDailymotionUrl(url: string) {
        const dailymotionRegex = /^(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com\/video\/(\w+)|embed\/video\/(\w+))$/;
        return dailymotionRegex.test(url);
    }

    getDailymotionVideoId(url: string) {
        const dailymotionRegex = /(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com\/video\/(\w+)|embed\/video\/(\w+))/;
        const match = url.match(dailymotionRegex);

        if (match) {
            return match[1] || match[2];
        }

        return null;
    }

    embedToDailymotion(youtubeId: string): string {
        return `${this.dailymotionEmbedBaseUrl}/${youtubeId}`;
    }
    //####HANDLE DAILYMOTION EMBED START###############################################################################################################

    protected readonly AllowedOrganizationTypesEnum = AllowedOrganizationTypesEnum;


    protected readonly Roles = Role;
}
