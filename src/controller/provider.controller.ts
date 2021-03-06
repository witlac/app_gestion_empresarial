import {Body, Controller, Get, Headers, Param, Post, Put} from '@nestjs/common';
import {UnitOfWork} from "../infrastructure/unitOfWork/unitOfWork";
import {
    RegisterProviderRequest,
    RegisterProviderService
} from "../application/register.provider.service";
import { SearchProviderRequest, SearchProviderService } from '../application/search.provider.service';
import {
    UpdateProviderRequest,
    UpdateProviderService,
} from '../application/update.provider.service';

@Controller('provider')
export class ProviderController{

    constructor(private readonly _unitOfWork: UnitOfWork) {}

    @Post()
    async registerProvider(@Body() request: RegisterProviderRequest){
        const service: RegisterProviderService = new RegisterProviderService(this._unitOfWork);
        return await service.execute(request);
    }

    @Get(':identification')
    async searchSpecifyProvider(@Param() identification: string, @Headers() headers: string){
        const service: SearchProviderService = new SearchProviderService(this._unitOfWork);
        return await service.execute(new SearchProviderRequest(
            headers['authorization'].split(' ')[0],
            headers['authorization'].split(' ')[1],
            identification
        ));
    }

    @Get()
    async searchProviders(@Headers() headers: string){
        const service: SearchProviderService = new SearchProviderService(this._unitOfWork);
        return await service.execute(new SearchProviderRequest(
            headers['authorization'].split(' ')[0],
            headers['authorization'].split(' ')[1]
        ));
    }

    @Put()
    async updateProvider(@Body() request: UpdateProviderRequest){
        const service: UpdateProviderService = new UpdateProviderService(this._unitOfWork);
        return await service.execute(request);
    }

}