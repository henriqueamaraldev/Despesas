import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ExpensesModule } from './expenses/expenses.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mailer/mail.module';


@Module({

  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODBLINK),
    UserModule,
    ExpensesModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      }
    }),
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],

})

export class AppModule { }
