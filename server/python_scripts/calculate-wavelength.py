import sys
import json

from pymongo import MongoClient
client = MongoClient(host='mongodb://main:main@ds113636.mlab.com', port=13636, authSource='photo-dynamic-therapy',authMechanism='SCRAM-SHA-1')
db = client['photo-dynamic-therapy']
collection = db['patientrecords']
cursor = collection.find()
cursor1 = collection.find({'age':21})

rVal = sys.argv[1]

currPatient = cursor1[0]
#print(currPatient['optimalWavelength'])
trialnum = currPatient['trialNo']
optWaveLengths = []
melanins = []
ages = []
for x in range(0, cursor.count()-1):
	optWaveLengths.append(cursor[x]['optimalWavelength'])
	melanins.append(cursor[x]['melanin'])
	ages.append(cursor[x]['age'])
	
	
if(trialnum == 0):
	from scipy import interpolate
	collection.update({'age':21},{'$push':{'trials':{'trialNumber':1, 'redValue':rVal, 'redReduced':0,'wavelength':610}}})
	f = interpolate.interp2d(melanins, ages, optWaveLengths)
	currPatient['optimalWavelength'] = f(currPatient['melanin'], currPatient['age'])
	print(currPatient['optimalWavelength'])
if(trialnum == 1):
	cursor = collection.find({'age':21})
	qw = currPatient['trials']
	qe = qw[0]
	qr = qe['redValue']
	print(rVal)
	rredf = int(qr) - int(rVal)
	collection.update({'age':21},{'$push':{'trials':{'trialNumber':2, 'redValue':rVal, 'redReduced':rredf,'wavelength':605}}})
	print(currPatient['optimalWavelength']-5)
if(trialnum == 2):
	cursor = collection.find({'age':21})
	rredf = int(cursor1[0]['trials'][0]['redValue']) - int(rVal)
	collection.update({'age':21},{'$push':{'trials':{'trialNumber':3, 'redValue':rVal, 'redReduced':rredf,'wavelength':615}}})
	print(currPatient['optimalWavelength']+5)
if(trialnum > 2):
	rredf = int(cursor1[0]['trials'][0]['redValue']) - int(rVal)
	trnm = int(cursor1[0]['trials'][0]['trialNumber']) + 1
	collection.update({'age':21},{'$push':{'trials':{'trialNumber':trnm, 'redValue':rVal, 'redReduced':rredf,'wavelength':int(cursor1[0]['optimalWavelength'])}}})
	trials = currPatient['trials']
	best =trials[0]
	for x in range(0, len(trials)-1):
		if(int(best['redReduced'])/int(best['redValue'])<int(trials[x+1]['redReduced'])/int(trials[x+1]['redValue'])):
			best = trials[x+1]
	collection.update({'age':21},{'$set':{"optimalWavelength": int(best['wavelength']) }})	
	print(best['wavelength'])

	
trialnum = trialnum + 1;	
collection.update({'age':21},{'$set':{"trialNo": trialnum}})	
sys.stdout.flush()