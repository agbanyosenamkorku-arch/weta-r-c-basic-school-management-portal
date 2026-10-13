import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ParentsService } from './parents.service';

@Controller('parents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}

  @Post('add-child')
  @Roles('ADMIN')
  addChild(@Body() body: { parentId: string; studentId: string }) {
    return this.parentsService.addChild(body.parentId, body.studentId);
  }

  @Get('me')
  @Roles('PARENT')
  me(@Req() req) {
    return this.parentsService.me(req.user.id);
  }

  @Get(':parentId/children')
  @Roles('ADMIN', 'PARENT')
  listChildren(@Param('parentId') parentId: string) {
    return this.parentsService.listChildren(parentId);
  }
}
