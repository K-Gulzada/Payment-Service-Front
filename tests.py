import json

from django.test import TestCase
from rest_framework.generics import get_object_or_404

from paymentgateway.models import PaymentMethod, Bank


class PaymentMethodTest(TestCase):
    def test_getAllData(self):
        response = self.client.get("http://localhost:8000/payment-methods/")
        print(response)
        self.assertEqual(response.status_code, 200)

    def test_postData(self):
        payment_for_test = {
            "methodName": "name_7"
        }
        response = self.client.post("http://localhost:8000/payment-methods/", json.dumps(payment_for_test),
                                    content_type="application/json")

        # print(get_object_or_404(PaymentMethod.objects.all(), pk=response.))
        print(json.loads(response.content))
        json_object = json.loads(response.content)

        print(json_object["id"])
        self.assertEqual(response.status_code, 200)

    def test_update(self):
        payment_for_test = {
            "methodName": "name_7"
        }
        pm = PaymentMethod(methodName="test update method")
        pm.save()
        response = self.client.put('http://127.0.0.1:8000/payment-methods/' + str(
            pm.id), json.dumps(payment_for_test), content_type="application/json")
        self.assertTrue(PaymentMethod.objects.filter(
            methodName="name_7").first())
        self.assertEqual(response.status_code, 200)

    def test_delete(self):
        pm = PaymentMethod(methodName="test delete method")
        pm.save()
        response = self.client.delete(
            'http://127.0.0.1:8000/payment-methods/' + str(pm.id))
        self.assertEqual(response.status_code, 204)
        self.assertFalse(PaymentMethod.objects.filter(id=pm.id).first())


class BankTest(TestCase):
    def test_getAllData(self):
        response = self.client.get("http://localhost:8000/bank/")
        print(response)
        self.assertEqual(response.status_code, 200)

    def test_postData(self):
        bank_for_test = {
            "config": "Configuration for test 1"
        }
        response = self.client.post("http://localhost:8000/bank/", json.dumps(bank_for_test),
                                    content_type="application/json")

        # print(get_object_or_404(PaymentMethod.objects.all(), pk=response.))
        print(json.loads(response.content))
        json_object = json.loads(response.content)

        print(json_object["id"])
        self.assertEqual(response.status_code, 200)

    def test_update(self):
        bank_for_test = {
            "config": "test config"
        }
        bank = Bank(config="test update method")
        bank.save()
        response = self.client.put('http://127.0.0.1:8000/bank/' + str(
            bank.id), json.dumps(bank_for_test), content_type="application/json")
        self.assertTrue(Bank.objects.filter(
            config="test update method").first())
        self.assertEqual(response.status_code, 200)

    def test_delete(self):
        bank = Bank(config="test delete method")
        bank.save()
        response = self.client.delete(
            'http://127.0.0.1:8000/bank/' + str(bank.id))
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Bank.objects.filter(id=bank.id).first())
