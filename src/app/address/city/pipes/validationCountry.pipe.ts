import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { CountryService } from "../../country/country.service";
import { CountryNotFoundException } from "../../country/errors/countryNotFoundException.error";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class ValidationCountryPipe implements PipeTransform {
    constructor(private readonly prisma: PrismaService) {}

    async transform(value: any, metadata: ArgumentMetadata) {
       const countryId = value.countryId;
        const country = await this.prisma.country.findUnique({ where: { id: countryId }});

        if (!country) {
            throw new NotFoundException(`Country with ID ${countryId} not found`);
        };
        return value;
    };
};